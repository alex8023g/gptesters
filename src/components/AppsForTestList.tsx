import { App } from '@prisma/client';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function AppsForTestList({ allApps }: { allApps: App[] }) {
  console.log('allApps:', allApps);
  return (
    <>
      <h1 className='font-bold'>AppsForTestList:</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>app name</TableHead>
            <TableHead>app url</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allApps.map((app) => (
            <TableRow key={app.id} className=''>
              <TableCell className=''>{app.name}</TableCell>
              <TableCell>
                <Link href={app.url}>{app.url}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
