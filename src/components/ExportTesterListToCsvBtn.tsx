'use client';
import { appAction } from '@/actions/appActions/appAction';
import { Button } from './ui/button';
import dayjs from 'dayjs';

type Props = {
  allTestersEmails: string[];
  userId: string;
  appId: string;
};
export function ExportTesterListToCsvBtn({
  allTestersEmails,
  userId,
  appId,
}: Props) {
  return (
    <>
      <Button
        onClick={() => {
          appAction.addUsersAsTesters({
            userId,
            appId,
          });
          // console.log('save file');
          const data = allTestersEmails.join('\n');
          const file = new Blob([data], { type: 'text/csv' });
          const a = document.createElement('a');
          const url = URL.createObjectURL(file);
          a.href = url;
          a.download = 'emails-' + dayjs().format('YYYY-MM-DD');
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }}
      >
        export testers list to csv
      </Button>
    </>
  );
}
