"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, Plus, Edit, Trash2, LogOut, ChefHat } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchMenu();
    }, []);

    async function fetchMenu() {
        setLoading(true);
        const { data, error } = await supabase
            .from('menu_items')
            .select(`*, category:categories(name), product_variants(price)`)
            .order('name');
        if (!error) setItems(data || []);
        setLoading(false);
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure? This will delete the dish and all its prices forever.")) return;

        // Delete from Supabase (Cascade will handle variants)
        const { error } = await supabase.from('menu_items').delete().eq('id', id);

        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            // Remove from local state instantly (UI Optimism)
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[var(--cream-primary)] p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg border-2 border-[var(--cream-dark)]">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                        <Image 
                            src="/logo.svg" 
                            alt="Schephino's Kitchen Logo" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--green-dark)]">Menu Manager</h1>
                        <p className="text-[var(--text-medium)] text-xs sm:text-sm font-medium">
                            <ChefHat size={14} className="inline mr-1" />
                            {items.length} dishes in your kitchen
                        </p>
                    </div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-colors font-semibold text-sm sm:text-base">
                    <LogOut size={18} /> Sign Out
                </button>
            </div>

            {/* Search and Actions */}
            <div className="space-y-3 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--text-medium)]" size={18} />
                    <input
                        type="text"
                        placeholder="Search food name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-[var(--cream-dark)] focus:ring-4 focus:ring-[var(--green-primary)]/20 focus:border-[var(--green-primary)] outline-none text-sm sm:text-base"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Link href="/admin/dashboard/add" className="bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-dark)] text-white px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 hover:shadow-xl transition-all text-xs sm:text-base">
                        <Plus size={16} className="sm:w-5 sm:h-5" /> <span className="hidden xs:inline">Add </span>Dish
                    </Link>
                    <Link href="/admin/categories" className="bg-white text-[var(--green-primary)] border-2 border-[var(--green-primary)] px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[var(--cream-primary)] transition-all text-xs sm:text-base">
                        Categories
                    </Link>
                </div>
            </div>

            {/* Dishes Table - Desktop */}
            <div className="hidden md:block bg-white rounded-3xl shadow-lg border-2 border-[var(--cream-dark)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[var(--cream-primary)] text-[var(--text-dark)] uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="p-4 border-b-2 border-[var(--cream-dark)]">Image</th>
                            <th className="p-4 border-b-2 border-[var(--cream-dark)]">Name</th>
                            <th className="p-4 border-b-2 border-[var(--cream-dark)]">Category</th>
                            <th className="p-4 border-b-2 border-[var(--cream-dark)]">Price Range</th>
                            <th className="p-4 border-b-2 border-[var(--cream-dark)] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-[var(--cream-dark)]">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-[var(--text-medium)]">Loading menu...</td></tr>
                        ) : filteredItems.map((item) => {
                            const prices = item.product_variants?.map(v => v.price) || [];
                            const minPrice = Math.min(...prices);
                            const maxPrice = Math.max(...prices);
                            const priceDisplay = prices.length > 0 ? (minPrice === maxPrice ? `£${minPrice}` : `£${minPrice} - £${maxPrice}`) : 'No Price';

                            return (
                                <tr key={item.id} className="hover:bg-[var(--cream-primary)] transition-colors">
                                    <td className="p-4">
                                        <div className="h-14 w-14 rounded-xl overflow-hidden bg-[var(--cream-secondary)]">
                                            {item.image_url && <img src={item.image_url} alt="" className="h-full w-full object-cover" />}
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-[var(--text-dark)]">{item.name}</td>
                                    <td className="p-4"><span className="px-3 py-1.5 bg-[var(--cream-primary)] border-2 border-[var(--green-primary)] text-[var(--green-primary)] text-xs rounded-full font-bold">{item.category?.name}</span></td>
                                    <td className="p-4 font-bold text-[var(--green-dark)]">{priceDisplay}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link href={`/admin/dashboard/edit/${item.id}`} className="inline-flex p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="inline-flex p-2.5 text-red-600 hover:bg-red-50 rounded-xl">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Dishes Cards - Mobile */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="bg-white p-8 rounded-2xl text-center text-[var(--text-medium)]">Loading menu...</div>
                ) : filteredItems.map((item) => {
                    const prices = item.product_variants?.map(v => v.price) || [];
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    const priceDisplay = prices.length > 0 ? (minPrice === maxPrice ? `£${minPrice}` : `£${minPrice} - £${maxPrice}`) : 'No Price';

                    return (
                        <div key={item.id} className="bg-white border-2 border-[var(--cream-dark)] rounded-2xl overflow-hidden shadow-md">
                            <div className="flex gap-4 p-4">
                                <div className="h-20 w-20 rounded-xl overflow-hidden bg-[var(--cream-secondary)] flex-shrink-0">
                                    {item.image_url && <img src={item.image_url} alt="" className="h-full w-full object-cover" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-[var(--text-dark)] text-lg mb-1 truncate">{item.name}</h3>
                                    <span className="inline-block px-2.5 py-1 bg-[var(--cream-primary)] border border-[var(--green-primary)] text-[var(--green-primary)] text-xs rounded-full font-bold mb-2">{item.category?.name}</span>
                                    <p className="font-bold text-[var(--green-dark)] text-lg">{priceDisplay}</p>
                                </div>
                            </div>
                            <div className="flex border-t-2 border-[var(--cream-dark)]">
                                <Link href={`/admin/dashboard/edit/${item.id}`} className="flex-1 flex items-center justify-center gap-2 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
                                    <Edit size={18} /> Edit
                                </Link>
                                <button onClick={() => handleDelete(item.id)} className="flex-1 flex items-center justify-center gap-2 py-3 text-red-600 font-semibold hover:bg-red-50 transition-colors border-l-2 border-[var(--cream-dark)]">
                                    <Trash2 size={18} /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
