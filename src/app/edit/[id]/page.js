import { pool } from "@/utils/dbConnect";
import dbConnect from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function edit({ params }) {
  dbConnect();
  const id = params.id;
  const data = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
  const result = data.rows[0];

  async function updateNote(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let body = data.get("body")?.valueOf();
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE notes SET title = $1, body = $2 WHERE id = $3",
        [title, body, id]
      );
      client.release();
      console.log(data, result.rows);
    } catch (err) {
      console.error("Error update data", err);
    }
    redirect("/");
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">Edit Anime Note</h1>
        <form action={updateNote} className="space-y-4">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={result.title}
            placeholder="Add Title"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="body"
            id="body"
            placeholder="Description"
            defaultValue={result.body}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 h-28"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-500 transition duration-300"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </main>
  );
}
