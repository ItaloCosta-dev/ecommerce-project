'use client';

import CheckoutWizard from "@/components/CheckoutWizard";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


interface ShippingAddressForm {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}


interface CartState {
  shippingAddress: ShippingAddressForm;
}


const ShippingAddressPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ShippingAddressForm>(); 

  const router = useRouter();
  const dispatch = useDispatch();

 
  const { shippingAddress } = useSelector((state: { cart: CartState }) => state.cart);

  useEffect(() => {
    if(shippingAddress) {
      setValue("fullName", shippingAddress.fullName);
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
      setValue("country", shippingAddress.country);
    }
    
  }, [setValue, shippingAddress]);

  const submitHandler = (data: ShippingAddressForm) => {
    dispatch(saveShippingAddress(data));
    router.push("/payment");
  };

  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Dados do cliente</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Nome Completo</label>
          <input 
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Por favor insira seu nome completo',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="address">Endereço</label>
        <input 
          className="w-full"
          id="address"
          {...register('address', {
            required: 'Por favor insira o seu endereço.',
            minLength: {
              value: 5,
              message: "Endereço deve ter mais do que 5 caracteres."
            }
          })}
        />
        {errors.address && (
          <div className="text-red-500">{errors.address.message}</div>
        )}
        </div>
        <div>
          <label htmlFor="address">Cidade</label>
        <input 
          className="w-full"
          id="city"
          {...register('city', {
            required: 'Por favor insira sua cidade.',
          })}
        />
        {errors.city && (
          <div className="text-red-500">{errors.city.message}</div>
        )}
        </div>
        <div>
          <label htmlFor="address">Cep</label>
        <input 
          className="w-full"
          id="postalCode"
          {...register('postalCode', {
            required: 'Por favor insira o seu cep.',
            minLength: {
              value: 8,
              message: "O CEP deve ter mais do que 8 dígitos."
            }
          })}
        />
        {errors.postalCode && (
          <div className="text-red-500">{errors.postalCode.message}</div>
        )}
        </div>
        <div>
          <label htmlFor="country">País</label>
        <input 
          className="w-full"
          id="country"
          {...register('country', {
            required: 'Por favor insira o seu país.',
          })}
        />
        {errors.country && (
          <div className="text-red-500">{errors.country.message}</div>
        )}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="primary-button">Avançar</button>

        </div>
      </form>
    </div>
  );
};

export default ShippingAddressPage;
