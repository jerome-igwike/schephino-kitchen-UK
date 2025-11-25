"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Trash2, Plus, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) setCategories(data);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);

    // Generate a slug (e.g. "Christmas Specials" -> "christmas-specials")
    const slug = newCategory.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const { error } = await supabase.from('categories').insert([{ name: newCategory, slug }]);

    if (error) {
      alert(error.message);
    } else {
      setNewCategory('');
      fetchCategories();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Warning: Deleting a category will hide all dishes inside it. Are you sure?")) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream-primary)] p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/admin/dashboard" className="p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-md text-[var(--text-medium)] hover:text-[var(--green-primary)] hover:shadow-lg transition-all border-2 border-[var(--cream-dark)] flex-shrink-0">
            <ArrowLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image 
                src="/logo.svg" 
                alt="Schephino's Kitchen Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--green-dark)] truncate">Manage Categories</h1>
              <p className="text-xs sm:text-sm text-[var(--text-medium)] font-medium hidden xs:block">Organize your menu sections</p>
            </div>
          </div>
        </div>

        {/* Add New Category Box */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg border-2 border-[var(--cream-dark)] mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="sm:w-5 sm:h-5 text-[var(--gold-accent)]" />
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-dark)]">Add New Category</h2>
          </div>
          <form onSubmit={handleAdd} className="space-y-3">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name (e.g. Specials)"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-[var(--cream-dark)] rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--green-primary)]/20 focus:border-[var(--green-primary)] text-sm sm:text-base"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-dark)] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50 text-sm sm:text-base"
            >
              <Plus size={18} className="sm:w-5 sm:h-5" /> Add Category
            </button>
          </form>
        </div>

        {/* Category List - Desktop */}
        <div className="hidden sm:block bg-white rounded-3xl shadow-lg border-2 border-[var(--cream-dark)] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[var(--cream-primary)] text-[var(--text-dark)] uppercase text-xs font-bold">
              <tr>
                <th className="p-4 border-b-2 border-[var(--cream-dark)]">Name</th>
                <th className="p-4 border-b-2 border-[var(--cream-dark)]">Slug</th>
                <th className="p-4 border-b-2 border-[var(--cream-dark)] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[var(--cream-dark)]">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[var(--cream-primary)] transition-colors">
                  <td className="p-4 font-bold text-[var(--text-dark)] text-lg">{cat.name}</td>
                  <td className="p-4 text-[var(--text-medium)] text-sm font-mono">{cat.slug}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-500 p-2.5 hover:bg-red-50 rounded-xl inline-flex"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Cards - Mobile */}
        <div className="sm:hidden space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border-2 border-[var(--cream-dark)] rounded-2xl overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="font-bold text-[var(--text-dark)] text-lg mb-1">{cat.name}</h3>
                <p className="text-[var(--text-medium)] text-sm font-mono">{cat.slug}</p>
              </div>
              <button 
                onClick={() => handleDelete(cat.id)}
                className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors border-t-2 border-[var(--cream-dark)]"
              >
                <Trash2 size={18} /> Delete Category
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
