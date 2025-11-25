"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Plus, Trash2, Save, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DishForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Form State
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [variants, setVariants] = useState(initialData?.product_variants || [{ size_label: 'Standard', price: '' }]);

  // Fetch Categories on load
  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      if (data) setCategories(data);
      if (!categoryId && data && data.length > 0) setCategoryId(data[0].id);
    });
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('meals').upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image');
    } else {
      const { data } = supabase.storage.from('meals').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    }
    setLoading(false);
  };

  // Handle Save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dishData = { name, description, category_id: categoryId, image_url: imageUrl };

    let dishId = initialData?.id;

    if (initialData) {
      // UPDATE existing
      await supabase.from('menu_items').update(dishData).eq('id', dishId);
    } else {
      // INSERT new
      const { data, error } = await supabase.from('menu_items').insert([dishData]).select();
      if (error) { alert(error.message); setLoading(false); return; }
      dishId = data[0].id;
    }

    // Handle Variants (Delete all old, Insert all new - easiest way to sync)
    if (initialData) {
      await supabase.from('product_variants').delete().eq('menu_item_id', dishId);
    }

    const variantsToInsert = variants.map(v => ({
      menu_item_id: dishId,
      size_label: v.size_label,
      price: parseFloat(v.price),
      is_default: false // simplified
    }));

    await supabase.from('product_variants').insert(variantsToInsert);

    setLoading(false);
    router.push('/admin/dashboard');
    router.refresh();
  };

  // Variant Helpers
  const addVariant = () => setVariants([...variants, { size_label: '', price: '' }]);
  const removeVariant = (index) => setVariants(variants.filter((_, i) => i !== index));
  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard" className="p-2 bg-stone-100 rounded-full"><ArrowLeft size={20}/></Link>
        <h1 className="text-2xl font-bold text-[#1A4D2E]">{initialData ? 'Edit Dish' : 'Add New Dish'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Uploader */}
        <div className="flex items-center gap-6">
          <div className="h-32 w-32 bg-stone-100 rounded-xl overflow-hidden border-2 border-dashed border-stone-300 flex items-center justify-center relative">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <Upload className="text-stone-400" />
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <div className="flex-1">
            <label className="block font-bold text-gray-700 mb-1">Dish Image</label>
            <p className="text-xs text-gray-500">Click the box to upload. Supports JPG, PNG, WEBP.</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block font-bold text-gray-700 mb-1">Dish Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="e.g. Jollof Rice" />
          </div>
          <div className="col-span-2">
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-xl" rows="3" placeholder="Tasty and spicy..." />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Category</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-3 border rounded-xl bg-white">
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        {/* Variants (Prices) */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div className="flex justify-between items-center mb-3">
            <label className="font-bold text-gray-700">Portions & Prices</label>
            <button type="button" onClick={addVariant} className="text-sm text-[#1A4D2E] font-bold flex items-center gap-1"><Plus size={16}/> Add Size</button>
          </div>
          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-3">
                <input type="text" placeholder="Size (e.g. 2 Litres)" value={variant.size_label} onChange={e => updateVariant(index, 'size_label', e.target.value)} className="flex-1 p-2 border rounded-lg" required />
                <input type="number" placeholder="Price (£)" value={variant.price} onChange={e => updateVariant(index, 'price', e.target.value)} className="w-24 p-2 border rounded-lg" required />
                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 p-2"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#1A4D2E] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#143b23] transition-colors">
          {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Dish</>}
        </button>
      </form>
    </div>
  );
}