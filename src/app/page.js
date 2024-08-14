import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  dbConnect();

  async function createNote(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let body = data.get("body")?.valueOf();
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO notes (title, body) VALUES ($1, $2)",
        [title, body]
      );
      client.release();
      console.log(data, result.rows);
    } catch (err) {
      console.error(err);
    }
    redirect("/");
  }

  const data = await pool.query("SELECT * FROM notes");
  const result = data.rows;

  async function deleteNote(data) {
    "use server";
    let id = data.get("id")?.valueOf();
    try {
      const client = await pool.connect();
      const result = await client.query("DELETE FROM notes WHERE id = $1", [
        id,
      ]);
      client.release();
      console.log(data, result.rows);
    } catch (err) {
      console.error("Error delete data", err);
    }
    redirect("/");
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">Anime Note</h1>
        <form action={createNote} className="space-y-4 mb-6">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Add Title"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="body"
            id="body"
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 h-28"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-500 transition duration-300"
          >
            SUBMIT
          </button>
        </form>

        {/* Kondisi untuk menampilkan pesan ketika tidak ada catatan */}
        {result.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Tidak ada catatan</p>
        ) : (
          result.map((element) => (
            <ul key={element.id} className="flex my-3 m-5 w-full">
              <li className="w-[50%] text-center">{element.title}</li>
              <li className="w-[50%] text-center">{element.body}</li>
              <li className="w-[50%] text-center">
                {new Date(element.createdat).toLocaleString()}
              </li>
              <li className="w-[50%] flex justify-center gap-4">
                <Link href={"/edit/" + element.id}>
                  <button className="bg-green-600 font-bold text-white hover:bg-green-400 p-3 rounded-md">
                    Edit
                  </button>
                </Link>
                <form action={deleteNote}>
                  <input type="hidden" name="id" value={element.id} />
                  <button
                    type="submit"
                    className="bg-red-600 font-bold text-white hover:bg-red-400 p-3 rounded-md"
                  >
                    Delete
                  </button>
                </form>
              </li>
            </ul>
          ))
        )}
      </div>
    </main>
  );
}
