"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../../../lib/supabase';
import DishForm from '../../../../../components/admin/DishForm';
import { useParams } from 'next/navigation';

export default function EditDishPage() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    async function fetchDish() {
      const { data } = await supabase
        .from('menu_items')
        .select(`*, product_variants(*)`)
        .eq('id', id)
        .single();
      if (data) setDish(data);
    }
    fetchDish();
  }, [id]);

  if (!dish) return <div className="p-10 text-center">Loading...</div>;

  return <div className="p-6 min-h-screen bg-stone-50"><DishForm initialData={dish} /></div>;
}