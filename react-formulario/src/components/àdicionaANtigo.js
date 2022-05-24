import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

const Campo = ({label, ...props}) => {
	const [field, meta] = useField(props);
	return (
		<div className='form-group'>
			<label htmlFor={props.id}>{label}</label>
			<input
				{...field}
				{...props}
				className={meta.touched && meta.error ? 'is-invalid' : ''}
			/>
			{meta.touched && meta.error ? (
				<div className='invalid-feedback'>{meta.error}</div>
			) : null}
		</div>
	);
};

const AdicionaCliente = () => {

	const schema = yup.object({
		nome: yup.string()
			.required('Nome é obrigatório')
			.min(10, 'Nome deve ter no mínimo 10 caracteres')
			.max(30, 'Nome deve ter no máximo 30 caracteres'),
		email: yup.string()
			.required('Email inválido'),
		nascimento: yup.date()
			.required('Data de nascimento é obrigatória')
	})
	return (
		<>
			<h1>Cadastro de Clientes</h1>
			<Formik
				initialValues={{ nome: '', email: '', nascimento: '' }}
				validate={(values) => {
					const errors = {};
					if (!values.nome) {
						errors.nome = 'O nome é obrigatório';
					}
					if (!values.email) {
						errors.email = 'O email é obrigatório';
					} else if (
						values.email &&
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
							values.email,
						)
					) {
						errors.email = 'Email inválido';
					}
					if (!values.nascimento) {
						errors.nascimento = 'A data é obrigatória';
					}
					return errors;
				}}
				onSubmit={(values) => alert(JSON.stringify(values))}
			>
				{(props) => (
					<form onSubmit={props.handleSubmit} noValidate>
						<Campo id='nome' name='nome' type='text' label='Nome' />
						<Campo id='email'name='email'type='email'label='Email' />
						<Campo id='nascimento' name='nascimento' type='date' label='Data de Nascimento' />
						<button type='submit'>Adicionar</button>
					</form>
				)}
			</Formik>
		</>
	);
};

export default AdicionaCliente;
