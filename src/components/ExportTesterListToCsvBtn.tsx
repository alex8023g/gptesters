'use client';
import { Button } from './ui/button';
import dayjs from 'dayjs';

type Props = {
  userAppTestersEmails: string[];
};
export function ExportTesterListToCsvBtn({ userAppTestersEmails }: Props) {
  return (
    <>
      <Button
        onClick={() => {
          console.log('save file');
          const data = userAppTestersEmails.join('\n');
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
