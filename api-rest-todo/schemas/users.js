import zod from 'zod';

const userSchema = zod.object({
  username: zod.string({
    required_error: 'username is required'
  }),
  email: zod
    .string({
        required_error: 'email is required'
    })
    .email('Invalid email'),
  password: zod.string({
    required_error: 'password is required'
  })
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
