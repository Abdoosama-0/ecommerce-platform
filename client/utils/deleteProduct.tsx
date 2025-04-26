  const deleteProduct = async (productId :string ) => {
    try {
        const res = await fetch(`http://localhost:3000/admin/deleteProduct?id=${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
            alert('Product deleted successfully');
            window.location.reload(); // إعادة تحميل الصفحة بعد الحذف
            console.log('Product deleted successfully:', data);
        } else {
            console.error('Error deleting product:', data.message);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}
export default deleteProduct