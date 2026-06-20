import { z } from 'zod';

export const checkoutSchema = z
  .object({
    name: z.string().min(1, 'required'),
    email: z.string().email('invalidEmail').or(z.literal('')),
    phone: z.string().regex(/^[+\d\s()\-]{7,}$/, 'invalidPhone').or(z.literal('')),
    address: z.string().min(1, 'required'),
    instructions: z.string(),
  })
  .refine(data => data.email !== '' || data.phone !== '', {
    message: 'emailOrPhone',
    path: ['email'],
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

