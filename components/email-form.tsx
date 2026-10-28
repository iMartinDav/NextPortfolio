'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoaderCircle, SendHorizonal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PocketBase from 'pocketbase';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Initialize PocketBase client
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Form schema with a localized validation message
const createFormSchema = (invalidEmail: string) =>
  z.object({
    email: z
      .string()
      .email({ message: invalidEmail })
      .transform((email) => email.toLowerCase())
  });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export function EmailForm() {
  const t = useTranslations('EmailForm');
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = useMemo(() => createFormSchema(t('invalidEmail')), [t]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true); // Set loading state to true
    try {
      // wait for half a second to show loading animation
      await new Promise((resolve) => setTimeout(resolve, 500));
      const record = await pb.collection('cook_form_submissions').create(data);
      toast({
        variant: 'success',
        title: t('successTitle'),
        description: (
          <>
            <pre className='bg-background my-2 w-full rounded-md p-4'>
              <code className='text-neutral-500 dark:text-neutral-300'>
                {record.email}
              </code>
            </pre>
            <p className='text-lg font-semibold'>
              {t('successBody')}
            </p>
          </>
        )
      });
      form.reset(); // Reset form on successful submission
    } catch (error) {
      console.error('Error creating record:', error);
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorBody')
      });
    } finally {
      setIsLoading(false); // Set loading state to false after the request is complete
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full'>
        <div className='flex w-full items-center gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='relative w-full'>
                <FormControl className='w-full'>
                  <Input
                    className='w-full border-neutral-500 text-base' // Ensure font size is at least 16px
                    placeholder='email@domain.com'
                    {...field}
                  />
                </FormControl>
                <div className='absolute -bottom-6 z-[-1]'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type='submit'
            variant='default'
            className='group/Button flex w-fit items-center gap-2 text-base'
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div>{t('send')}</div>
                <LoaderCircle className='h-5 w-5 animate-spin' />
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <div>{t('send')}</div>
                <SendHorizonal className='h-5 w-5 transition-all duration-300 md:group-hover/Button:translate-x-[2px]' />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
