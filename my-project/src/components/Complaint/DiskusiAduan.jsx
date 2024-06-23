import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import iconGemeni from "../../assets/icon.svg";
import Hapus from "../../assets/delete_24px.svg";

const MySwal = withReactContent(Swal);

const DiskusiAduan = () => {
  // Data dummy untuk pengujian
  const discussions = [
    {
      id: 1,
      author: "Anonymouse",
      time: "Kamis, 09 Mei 2024 - 04:27 WIB",
      content:
        "Betul, kemarin saya lewat situ. Masa sampai sekarang belum ditangani sih.",
      isUser: true, // Tambahkan properti isUser untuk menandakan pesan dari user
    },
    {
      id: 2,
      author: "Admin",
      time: "Kamis, 09 Mei 2024 - 04:27 WIB",
      content:
        "Pesan dari admin. Betul, kemarin saya lewat situ. Masa sampai sekarang belum ditangani sih.",
      isUser: false, // Tambahkan properti isUser untuk menandakan pesan dari admin
    },
    {
      id: 3,
      author: "Anonymouse",
      time: "Kamis, 09 Mei 2024 - 04:27 WIB",
      content:
        "Betul, kemarin saya lewat situ. Masa sampai sekarang belum ditangani sih.",
      isUser: true, // Tambahkan properti isUser untuk menandakan pesan dari user
    },
    {
      id: 4,
      author: "Anonymouse",
      time: "Kamis, 09 Mei 2024 - 04:27 WIB",
      content:
        "Betul, kemarin saya lewat situ. Masa sampai sekarang belum ditangani sih.",
      isUser: true, // Tambahkan properti isUser untuk menandakan pesan dari user
    },
  ];

  // Function untuk menampilkan SweetAlert2 konfirmasi penghapusan
  const handleDeleteDiscussion = (id) => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan di sini (simulasi penghapusan untuk contoh)
        // Anda dapat menambahkan logika penghapusan sesuai dengan aplikasi Anda
        console.log("Menghapus diskusi dengan ID:", id);

        // Tampilkan pesan SweetAlert2 sukses jika diperlukan
        MySwal.fire("Terhapus!", "Diskusi telah dihapus.", "success");
      }
    });
  };

  return (
    <div className="bg-white w-full rounded-2xl py-4 px-5 flex flex-col gap-4">
      <h5 className="font-poppins font-semibold text-2xl">Diskusi Aduan</h5>
      <section className="flex flex-col">
        <div className="bg-main-color p-4">
          <p>
            No Aduan <span>G5102</span>
          </p>
        </div>
      </section>
      <div className="h-72 overflow-y-auto">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className={`border-b border-light-1 p-2 flex flex-col gap-3 ${
              discussion.isUser ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {discussion.isUser ? (
              <>
                <img
                  src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="User avatar"
                  className="rounded-full ml-4"
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">{discussion.author}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {discussion.time}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteDiscussion(discussion.id)}
                      className="text-red-500 flex items-center"
                    >
                      <img src={Hapus} alt="" className="w-4 h-4 mr-1" /> Hapus
                    </button>
                  </div>
                  <p>{discussion.content}</p>
                </div>
              </>
            ) : (
              <>
                <img
                  src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="User avatar"
                  className="rounded-full mr-4"
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleDeleteDiscussion(discussion.id)}
                      className="text-red-500 flex items-center"
                    >
                      <img src={Hapus} alt="" className="w-4 h-4 mr-1" /> Hapus
                    </button>
                    <div>
                      <span className="text-gray-500 text-sm">
                        {discussion.time}
                      </span>
                      <span className="font-bold ml-2">
                        {discussion.author}
                      </span>
                    </div>
                  </div>
                  <p className="text-right">{discussion.content}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full">
        <button className="flex w-full justify-center items-center rounded border border-dark-4 py-2 px-5 gap-1">
          <img src={iconGemeni} alt="icon" />
          <p className="bg-gradient-to-r from-[#4796E3] to-[#C96676] text-transparent bg-clip-text">
            Get Rekomendasi AI
          </p>
        </button>
        <textarea
          className="w-full mt-5 border border-gray-300 rounded p-2 min-h-28"
          placeholder="Ketik disini"
          name=""
          id=""
          cols="30"
        ></textarea>
        <button className="text-info-3 bg-white border border-info-3 px-6 py-2.5 rounded shadow mt-3 font-medium">
          Kirim Diskusi
        </button>
      </div>
    </div>
  );
};

export default DiskusiAduan;
