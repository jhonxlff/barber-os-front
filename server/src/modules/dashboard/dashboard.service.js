import { db } from '../../db/pool.js';
import { localDate, todayExpr } from '../../lib/tz.js';
import { config } from '../../config.js';

const TZ = config.appTz;

export async function getMetrics(tenantId) {
  const today = todayExpr();

  const { rows: [m] } = await db.query(`
    SELECT
      COALESCE(SUM(a.price) FILTER (
        WHERE ${localDate()} = ${today}
          AND a.status::text IN ('FINALIZADO','PAGO')
      ), 0) as revenue_today_done,

      COALESCE(SUM(a.price) FILTER (
        WHERE ${localDate()} = ${today}
          AND a.status::text IN ('PENDENTE','CONFIRMADO')
      ), 0) as revenue_today_booked,

      COALESCE(SUM(a.price) FILTER (
        WHERE date_trunc('month', a.start_at AT TIME ZONE '${TZ}') = date_trunc('month', now() AT TIME ZONE '${TZ}')
          AND a.status::text IN ('FINALIZADO','PAGO')
      ), 0) as revenue_month_done,

      COALESCE(SUM(a.price) FILTER (
        WHERE date_trunc('month', a.start_at AT TIME ZONE '${TZ}') = date_trunc('month', now() AT TIME ZONE '${TZ}')
          AND a.status::text IN ('PENDENTE','CONFIRMADO')
      ), 0) as revenue_month_booked,

      COUNT(DISTINCT a.client_id) FILTER (
        WHERE ${localDate()} = ${today}
          AND a.status::text NOT IN ('CANCELADO','NO_SHOW')
      ) as clients_today,

      COUNT(a.id) FILTER (
        WHERE a.start_at > now()
          AND a.status::text IN ('PENDENTE','CONFIRMADO','PAGO')
      ) as upcoming_appointments,

      CASE
        WHEN COUNT(a.id) FILTER (WHERE ${localDate()} >= ${today} - 30) > 0
        THEN ROUND(
          COUNT(a.id) FILTER (WHERE a.status::text = 'NO_SHOW' AND ${localDate()} >= ${today} - 30)::numeric
          / COUNT(a.id) FILTER (WHERE ${localDate()} >= ${today} - 30)::numeric * 100, 1
        )
        ELSE 0
      END as no_show_rate,

      CASE
        WHEN COUNT(a.id) FILTER (WHERE a.status::text IN ('FINALIZADO','PAGO') AND ${localDate()} >= ${today} - 30) > 0
        THEN ROUND(
          SUM(a.price) FILTER (WHERE a.status::text IN ('FINALIZADO','PAGO') AND ${localDate()} >= ${today} - 30)
          / COUNT(a.id) FILTER (WHERE a.status::text IN ('FINALIZADO','PAGO') AND ${localDate()} >= ${today} - 30), 2
        )
        ELSE 0
      END as average_ticket

    FROM appointments a
    WHERE a.tenant_id = $1
  `, [tenantId]);

  const rtd = Number(m.revenue_today_done);
  const rtb = Number(m.revenue_today_booked);
  const rmd = Number(m.revenue_month_done);
  const rmb = Number(m.revenue_month_booked);

  return {
    revenueToday: rtd + rtb,
    revenueMonth: rmd + rmb,
    revenueTodayDone: rtd,
    revenueTodayBooked: rtb,
    revenueMonthDone: rmd,
    revenueMonthBooked: rmb,
    clientsToday: parseInt(m.clients_today) || 0,
    upcomingAppointments: parseInt(m.upcoming_appointments) || 0,
    noShowRate: Number(m.no_show_rate) || 0,
    averageTicket: Number(m.average_ticket) || 0,
  };
}

export async function getCharts(tenantId, days = 60, top = 5) {
  // Revenue series
  const { rows: revenueSeries } = await db.query(`
    SELECT ${localDate()}::text as date, COALESCE(SUM(a.price), 0) as value
    FROM appointments a
    WHERE a.tenant_id = $1
      AND ${localDate()} >= ${todayExpr()} - $2::int
      AND a.status::text IN ('FINALIZADO','PAGO')
    GROUP BY ${localDate()}
    ORDER BY date ASC
  `, [tenantId, days]);

  // Top services (using JOIN, not service_name column)
  const { rows: topServices } = await db.query(`
    SELECT s.name, COALESCE(SUM(a.price), 0) as value
    FROM appointments a
    JOIN services s ON s.id = a.service_id
    WHERE a.tenant_id = $1
      AND a.start_at >= now() - ($2 || ' days')::interval
      AND a.status::text IN ('FINALIZADO','PAGO')
    GROUP BY s.name
    ORDER BY value DESC
    LIMIT $3
  `, [tenantId, String(days), top]);

  return {
    revenueSeries: revenueSeries.map(r => ({ date: r.date, value: Number(r.value) })),
    topServices: topServices.map(r => ({ name: r.name, value: Number(r.value) })),
  };
}
