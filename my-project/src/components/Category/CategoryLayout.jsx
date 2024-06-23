import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import HeaderLayout from '../Header/HeaderLayout';
import SidebarLayout from '../Header/SidebarLayout';

function CategoryLayout() {
  const [category, setCategory] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    Name: '',
    Description: '',
  });
  const [searchKeyword, setSearchKeyword] = useState(''); // State untuk menyimpan kata kunci pencarian

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://capstone-dev.mdrizki.my.id/api/v1/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCategory(data.data);
    } catch (error) {
      console.error('Error fetching category: ', error);
    }
  };

  const deleteCategory = async (categoryID) => {
    try {
      const token = sessionStorage.getItem('token');
      const confirmed = await confirmDelete();

      if (!confirmed) return;

      const response = await fetch(`https://capstone-dev.mdrizki.my.id/api/v1/categories/${categoryID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCategory((prevCategory) => prevCategory.filter((category) => category.ID !== categoryID));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Kategori berhasil dihapus',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  const confirmDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#2563EB',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your category has been deleted',
        icon: 'success',
        confirmButtonColor: '#DC2626',
      });
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await Swal.fire({
        title: 'Cancelled',
        text: 'Your category is safe :)',
        icon: 'error',
        confirmButtonColor: '#2563EB',
      });
      return false;
    }
  };

  const handleNewCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://capstone-dev.mdrizki.my.id/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNewCategory({
        Name: '',
        Description: '',
      });
      setIsAdding(false);
      fetchCategory();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Kategori berhasil ditambahkan',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error creating new category:', error);
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleEditCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`https://capstone-dev.mdrizki.my.id/api/v1/categories/${currentCategory.ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentCategory),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsEditing(false);
      setCurrentCategory(null);
      fetchCategory();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Kategori berhasil diperbarui',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredCategories = category.filter((cat) => cat.Name.toLowerCase().includes(searchKeyword.toLowerCase()) || cat.Description.toLowerCase().includes(searchKeyword.toLowerCase()));

  return (
    <section className="flex w-full flex-col">
      <HeaderLayout />
      <SidebarLayout />
      <div className=" pl-80 py-3 px-2 min-h-[80dvh] overflow-y-auto bg-light-1">
        <main className="py-4 px-2">
          <h1 className="text-2xl lg:text-4xl mb-5">Kategori</h1>
          <section className="flex justify-between">
            <button type="button" className="flex bg-main-color py-2 pl-4 pr-6 rounded-md mb-4 hover:bg-main-darker" onClick={() => setIsAdding(true)}>
              <PlusIcon className="size-6 text-black" />
              <p className="font-medium text-black font-montserrat">Tambah Kategori</p>
            </button>
            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                {' '}
                Search{' '}
              </label>

              <input type="text" id="Search" placeholder="Search for..." value={searchKeyword} onChange={handleSearchInputChange} className="ps-9 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm" />

              <span className="absolute left-0 inset-y-0 end-0 grid w-12 -mt-3 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                  <span className="sr-only">Search</span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </span>
            </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 bg-light-2 pl-5 pt-5 pb-5">
            {filteredCategories.map((category, index) => (
              <div className="bg-white shadow-lg col-auto md:col-span-1 lg:col-span-2 rounded-lg pl-5 pr-5 pt-3 pb-3" key={index}>
                <p className="text-main-color">{category.Name}</p>
                <p>{category.Description}</p>
                <div className="flex">
                  <button onClick={() => handleEditCategory(category)}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-outside-1_4280_4731" maskUnits="userSpaceOnUse" x={3} y={4} width={17} height={17} fill="black">
                        <rect fill="white" x={3} y={4} width={17} height={17} />
                        <path d="M13.5858 7.41421L6.39171 14.6083C6.19706 14.8029 6.09974 14.9003 6.03276 15.0186C5.96579 15.1368 5.93241 15.2704 5.86564 15.5374L5.20211 18.1915C5.11186 18.5526 5.06673 18.7331 5.16682 18.8332C5.2669 18.9333 5.44742 18.8881 5.80844 18.7979L5.80845 18.7979L8.46257 18.1344C8.72963 18.0676 8.86316 18.0342 8.98145 17.9672C9.09974 17.9003 9.19706 17.8029 9.39171 17.6083L16.5858 10.4142L16.5858 10.4142C17.2525 9.74755 17.5858 9.41421 17.5858 9C17.5858 8.58579 17.2525 8.25245 16.5858 7.58579L16.4142 7.41421C15.7475 6.74755 15.4142 6.41421 15 6.41421C14.5858 6.41421 14.2525 6.74755 13.5858 7.41421Z" />
                      </mask>
                      <path
                        d="M6.39171 14.6083L7.80593 16.0225L7.80593 16.0225L6.39171 14.6083ZM13.5858 7.41421L12.1716 6L12.1716 6L13.5858 7.41421ZM16.4142 7.41421L15 8.82843L15 8.82843L16.4142 7.41421ZM16.5858 7.58579L18 6.17157L18 6.17157L16.5858 7.58579ZM16.5858 10.4142L18 11.8284L16.5858 10.4142ZM9.39171 17.6083L7.9775 16.1941L7.9775 16.1941L9.39171 17.6083ZM5.86564 15.5374L7.80593 16.0225L7.80593 16.0225L5.86564 15.5374ZM5.20211 18.1915L3.26183 17.7065H3.26183L5.20211 18.1915ZM5.80845 18.7979L5.32338 16.8576L5.23624 16.8794L5.15141 16.9089L5.80845 18.7979ZM8.46257 18.1344L7.97751 16.1941L7.9775 16.1941L8.46257 18.1344ZM5.16682 18.8332L6.58103 17.419L6.58103 17.419L5.16682 18.8332ZM5.80844 18.7979L6.29351 20.7382L6.38065 20.7164L6.46549 20.6869L5.80844 18.7979ZM8.98145 17.9672L7.99605 16.2268L7.99605 16.2268L8.98145 17.9672ZM16.5858 10.4142L18 11.8284L18 11.8284L16.5858 10.4142ZM6.03276 15.0186L4.29236 14.0332L4.29236 14.0332L6.03276 15.0186ZM7.80593 16.0225L15 8.82843L12.1716 6L4.9775 13.1941L7.80593 16.0225ZM15 8.82843L15.1716 9L18 6.17157L17.8284 6L15 8.82843ZM15.1716 9L7.9775 16.1941L10.8059 19.0225L18 11.8284L15.1716 9ZM3.92536 15.0524L3.26183 17.7065L7.1424 18.6766L7.80593 16.0225L3.92536 15.0524ZM6.29352 20.7382L8.94764 20.0746L7.9775 16.1941L5.32338 16.8576L6.29352 20.7382ZM3.26183 17.7065C3.233 17.8218 3.15055 18.1296 3.12259 18.4155C3.0922 18.7261 3.06509 19.5599 3.7526 20.2474L6.58103 17.419C6.84671 17.6847 6.99914 18.0005 7.06644 18.2928C7.12513 18.5478 7.10965 18.7429 7.10358 18.8049C7.09699 18.8724 7.08792 18.904 7.097 18.8631C7.10537 18.8253 7.11788 18.7747 7.1424 18.6766L3.26183 17.7065ZM5.15141 16.9089L5.1514 16.9089L6.46549 20.6869L6.46549 20.6869L5.15141 16.9089ZM5.32338 16.8576C5.22531 16.8821 5.17467 16.8946 5.13694 16.903C5.09595 16.9121 5.12762 16.903 5.19506 16.8964C5.25712 16.8903 5.45223 16.8749 5.70717 16.9336C5.99955 17.0009 6.31535 17.1533 6.58103 17.419L3.7526 20.2474C4.44011 20.9349 5.27387 20.9078 5.58449 20.8774C5.87039 20.8494 6.17822 20.767 6.29351 20.7382L5.32338 16.8576ZM7.9775 16.1941C7.95279 16.2188 7.9317 16.2399 7.91214 16.2593C7.89271 16.2787 7.87671 16.2945 7.86293 16.308C7.84916 16.3215 7.83911 16.3312 7.83172 16.3382C7.82812 16.3416 7.82545 16.3441 7.8236 16.3458C7.82176 16.3475 7.8209 16.3483 7.82092 16.3482C7.82094 16.3482 7.82198 16.3473 7.82395 16.3456C7.82592 16.3439 7.82893 16.3413 7.83291 16.338C7.84086 16.3314 7.85292 16.3216 7.86866 16.3098C7.88455 16.2979 7.90362 16.2843 7.92564 16.2699C7.94776 16.2553 7.97131 16.2408 7.99605 16.2268L9.96684 19.7076C10.376 19.476 10.6864 19.1421 10.8059 19.0225L7.9775 16.1941ZM8.94764 20.0746C9.11169 20.0336 9.55771 19.9393 9.96685 19.7076L7.99605 16.2268C8.02079 16.2128 8.0453 16.2001 8.06917 16.1886C8.09292 16.1772 8.11438 16.1678 8.13277 16.1603C8.15098 16.1529 8.16553 16.1475 8.17529 16.1441C8.18017 16.1424 8.18394 16.1412 8.18642 16.1404C8.1889 16.1395 8.19024 16.1391 8.19026 16.1391C8.19028 16.1391 8.18918 16.1395 8.18677 16.1402C8.18435 16.1409 8.18084 16.1419 8.17606 16.1432C8.16625 16.1459 8.15278 16.1496 8.13414 16.1544C8.11548 16.1593 8.09368 16.1649 8.0671 16.1716C8.04034 16.1784 8.0114 16.1856 7.97751 16.1941L8.94764 20.0746ZM15.1716 9C15.3435 9.17192 15.4698 9.29842 15.5738 9.40785C15.6786 9.518 15.7263 9.57518 15.7457 9.60073C15.7644 9.62524 15.7226 9.57638 15.6774 9.46782C15.6254 9.34332 15.5858 9.18102 15.5858 9H19.5858C19.5858 8.17978 19.2282 7.57075 18.9258 7.1744C18.6586 6.82421 18.2934 6.46493 18 6.17157L15.1716 9ZM18 11.8284L18 11.8284L15.1716 8.99999L15.1716 9L18 11.8284ZM18 11.8284C18.2934 11.5351 18.6586 11.1758 18.9258 10.8256C19.2282 10.4292 19.5858 9.82022 19.5858 9H15.5858C15.5858 8.81898 15.6254 8.65668 15.6774 8.53218C15.7226 8.42362 15.7644 8.37476 15.7457 8.39927C15.7263 8.42482 15.6786 8.482 15.5738 8.59215C15.4698 8.70157 15.3435 8.82807 15.1716 9L18 11.8284ZM15 8.82843C15.1719 8.6565 15.2984 8.53019 15.4078 8.42615C15.518 8.32142 15.5752 8.27375 15.6007 8.25426C15.6252 8.23555 15.5764 8.27736 15.4678 8.32264C15.3433 8.37455 15.181 8.41421 15 8.41421V4.41421C14.1798 4.41421 13.5707 4.77177 13.1744 5.07417C12.8242 5.34136 12.4649 5.70664 12.1716 6L15 8.82843ZM17.8284 6C17.5351 5.70665 17.1758 5.34136 16.8256 5.07417C16.4293 4.77177 15.8202 4.41421 15 4.41421V8.41421C14.819 8.41421 14.6567 8.37455 14.5322 8.32264C14.4236 8.27736 14.3748 8.23555 14.3993 8.25426C14.4248 8.27375 14.482 8.32142 14.5922 8.42615C14.7016 8.53019 14.8281 8.6565 15 8.82843L17.8284 6ZM4.9775 13.1941C4.85793 13.3136 4.52401 13.624 4.29236 14.0332L7.77316 16.0039C7.75915 16.0287 7.7447 16.0522 7.73014 16.0744C7.71565 16.0964 7.70207 16.1155 7.69016 16.1313C7.67837 16.1471 7.66863 16.1591 7.66202 16.1671C7.65871 16.1711 7.65613 16.1741 7.65442 16.1761C7.65271 16.178 7.65178 16.1791 7.65176 16.1791C7.65174 16.1791 7.65252 16.1782 7.65422 16.1764C7.65593 16.1745 7.65842 16.1719 7.66184 16.1683C7.66884 16.1609 7.67852 16.1508 7.692 16.1371C7.7055 16.1233 7.72132 16.1073 7.74066 16.0879C7.76013 16.0683 7.78122 16.0472 7.80593 16.0225L4.9775 13.1941ZM7.80593 16.0225C7.8144 15.9886 7.82164 15.9597 7.82839 15.9329C7.8351 15.9063 7.84068 15.8845 7.84556 15.8659C7.85043 15.8472 7.85407 15.8337 7.8568 15.8239C7.85813 15.8192 7.85914 15.8157 7.85984 15.8132C7.86054 15.8108 7.86088 15.8097 7.86088 15.8097C7.86087 15.8098 7.86046 15.8111 7.85965 15.8136C7.85884 15.8161 7.85758 15.8198 7.85588 15.8247C7.85246 15.8345 7.84713 15.849 7.8397 15.8672C7.8322 15.8856 7.82284 15.9071 7.81141 15.9308C7.79993 15.9547 7.78717 15.9792 7.77316 16.0039L4.29236 14.0332C4.06071 14.4423 3.96637 14.8883 3.92536 15.0524L7.80593 16.0225Z"
                        fill="#2563EB"
                        mask="url(#path-1-outside-1_4280_4731)"
                      />
                      <path d="M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z" fill="#2563EB" />
                    </svg>
                  </button>
                  <button onClick={() => deleteCategory(category.ID)}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15 3V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H9V3H15ZM7 19H17V6H7V19ZM9 8H11V17H9V8ZM15 8H13V17H15V8Z" fill="#EA1212" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAdding && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <form onSubmit={handleNewCategorySubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 font-bold">Tambah Kategori Baru</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Name">
                    Nama
                  </label>
                  <input type="text" id="Name" name="Name" value={newCategory.Name} onChange={handleNewCategoryInputChange} className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Description">
                    Deskripsi
                  </label>
                  <input type="text" id="Description" name="Description" value={newCategory.Description} onChange={handleNewCategoryInputChange} className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsAdding(false)} className="mr-4 px-4 py-2 text-gray-600">
                    Batal
                  </button>
                  <button type="submit" className="px-4 py-2 bg-main-color text-white rounded">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          )}

          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <form onSubmit={handleEditCategorySubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 font-bold">Edit Kategori</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Name">
                    Nama
                  </label>
                  <input type="text" id="Name" name="Name" value={currentCategory.Name} onChange={handleEditCategoryInputChange} className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Description">
                    Deskripsi
                  </label>
                  <input type="text" id="Description" name="Description" value={currentCategory.Description} onChange={handleEditCategoryInputChange} className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsEditing(false)} className="mr-4 px-4 py-2 text-gray-600">
                    Batal
                  </button>
                  <button type="submit" className="px-4 py-2 bg-main-color text-white rounded">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default CategoryLayout;
