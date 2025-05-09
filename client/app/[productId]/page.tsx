// app/[productId]/page.tsx
import ProductDetails from "./components/productDetails";

// هذه الدالة ستجلب البيانات مباشرة من الخادم
async function getProductData(productId: string) {
  const res = await fetch(`http://localhost:3000/product?id=${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: "no-store" // للتأكد من عدم استخدام الكاش
  });

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  const data = await res.json();
  return data;
}

// Server Component
export default async function ProductPage({ params }: { params: { productId: string } }) {
  const data = await getProductData(params.productId);

  return (
    <main className="p-4 flex flex-col   gap-4">
      <ProductDetails 
        imageUrls={data?.imageUrls ?? []}  
        price={data?.price ?? undefined} 
        title={data?.title ?? 'not found'}
        productID={data?._id ?? 'not found'}
      />
      {data.details&&
      <div className="flex flex-col  justify-start items-start  gap-1">
        <p className="font-[fantasy] text-4xl">details:</p>
        <p>{data.details}</p>
      </div>
}
    </main>
  );
}
