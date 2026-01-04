import { Card, CardContent, Skeleton } from "@mui/material";

export default function MemeCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={180} />
      <CardContent>
        <Skeleton height={28} width="80%" />
        <Skeleton height={20} width="60%" />
        <Skeleton height={20} width="40%" />
        <Skeleton height={36} width="100%" />
      </CardContent>
    </Card>
  );
}
