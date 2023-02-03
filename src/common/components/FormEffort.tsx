import { z } from 'zod';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEffortDto } from '~/common/dto/effort';
import { Input } from '~/common/components/Input';

export const schema = z.object({
	title: z.string()
});

export const FormEffort = () => {
	const form = useForm<CreateEffortDto>({ resolver: zodResolver(schema) });

	return (<></>)
};
