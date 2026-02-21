import { Outlet } from 'react-router-dom';
import { LandingHeader } from './LandingHeader';
import { LandingFooter } from './LandingFooter';

export function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
