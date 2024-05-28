import zod from 'zod';

const taskSchema = zod.object({
  title: zod.string({
    required_error: 'title is required'
  }),
  subtitle: zod.string(),
  description: zod.string({
    required_error: 'description is required'
  }),
  time: zod.string(),
  status: zod.boolean({
    required_error: 'status is required'
  })
});

export function validateTask(input) {
  return taskSchema.safeParse(input);
}

export function validatePartialTask(input) {
  return taskSchema.partial().safeParse(input);
}