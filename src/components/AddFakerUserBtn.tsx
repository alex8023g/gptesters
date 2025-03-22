'use client';
import { userAction } from '@/actions/userActions/userAction';
import { Button } from '@/components/ui/button';

export function AddFakerUserBtn() {
  // const [email, setEmail] = useState('');
  return (
    <>
      <Button
        className='mb-2'
        onClick={async () => {
          userAction.addUser();
        }}
      >
        sign up as Faker User
      </Button>
      {/* <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          type='email'
          placeholder='login with email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          onClick={async () => {
            await userAction.login(email);
          }}
        >
          login
        </Button>
      </div> */}
    </>
  );
}
