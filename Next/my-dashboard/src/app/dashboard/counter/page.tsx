import { CartCounter } from "@/shopping-cart/components";

export const metadata = {
  title: "Counter Page",
  description: "Un contador básico",
};

export default function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito </span>
      <CartCounter value={20} />
    </div>
  );
}
