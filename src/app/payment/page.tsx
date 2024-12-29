'use client';

import CheckoutWizard from "@/components/CheckoutWizard";
import { hideLoading, savePaymentMethod } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface ShippingAddressForm {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
}

interface CartState {
  shippingAddress: ShippingAddressForm;
  paymentMethod: string;
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
  const [loading, setLoading] = useState(false);

  const { shippingAddress, paymentMethod } = useSelector(
    (state: { cart: CartState }) => state.cart
  );

  useEffect(() => {
    // Verifica se o endereço de envio está presente; caso contrário, redireciona.
    if (!shippingAddress?.address) {
      router.push('/shipping');
    } else {
      setValue('paymentMethod', paymentMethod);
    }
  }, [paymentMethod, router, setValue, shippingAddress]);

  useEffect(() => {
    // Oculta o estado de carregamento após a inicialização.
    dispatch(hideLoading());
  }, [dispatch]);

  const submitHandler = (data: ShippingAddressForm) => {
    if (!data.paymentMethod) {
      return; // Garante que o método de pagamento foi selecionado.
    }
    dispatch(savePaymentMethod(data.paymentMethod));
    router.push("/placeorder");
  };

  return (
    <div>
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Método de pagamento</h1>
        {['Cartão de crédito', 'Boleto', 'Pix'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              value={payment}
              {...register('paymentMethod', {
                required: 'Por favor, escolha um método de pagamento',
              })}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        {errors.paymentMethod && (
          <div className="text-red-500">{errors.paymentMethod.message}</div>
        )}
        <div className="mt-4 flex justify-between">
          <button type="submit" className="primary-button">
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressPage;