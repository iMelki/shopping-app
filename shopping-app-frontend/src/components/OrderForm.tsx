'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateForm } from '@/store/formSlice';

interface FormInputs {
  fullName: string;
  address: string;
  email: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

const OrderForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const selectedProducts = useAppSelector(
    (state) => state.products.selectedProducts
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(
      updateForm({
        ...data,
        products: selectedProducts,
      })
    );
    console.log('Form Submitted:', { ...data, products: selectedProducts });
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      {/* Full Name Field */}
      <Form.Item
        label="Full Name"
        validateStatus={errors.fullName ? 'error' : ''}
        help={errors.fullName?.message}
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => <Input id="fullName" {...field} />}
        />
      </Form.Item>

      {/* Address Field */}
      <Form.Item
        label="Address"
        validateStatus={errors.address ? 'error' : ''}
        help={errors.address?.message}
      >
        <Controller
          name="address"
          control={control}
          render={({ field }) => <Input id="address" {...field} />}
        />
      </Form.Item>

      {/* Email Field */}
      <Form.Item
        label="Email"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input id="email" {...field} />}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
