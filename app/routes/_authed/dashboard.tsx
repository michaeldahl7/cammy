import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/dashboard')({
  component: DashboardRoute,
});

function DashboardRoute() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4 md:min-h-min">
        <Card>
          <CardHeader>
            <CardTitle>Test</CardTitle>
            <CardDescription>Test</CardDescription>
          </CardHeader>
          <CardContent>Test</CardContent>
        </Card>
      </div>
    </div>
  );
}
