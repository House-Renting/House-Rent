import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "../lib/mongodb";
import UploadForm from "../components/UploadForm";
import DownloadForm from "../components/DownloadForm";

const rooms = ["hall", "kitchen", "bedroom", "washroom"];

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    await client.connect();
    return { props: { isConnected: true } };
  } catch (e) {
    console.error(e);
    return { props: { isConnected: false } };
  }
};

export default function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex flex-col items-center min-h-screen p-10 bg-gradient-to-br from-blue-50 to-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8">Upload Files</h1>

       {/* <div className="max-w-6xl w-full text-center">
        {isConnected ? (
          <p className="text-lg text-green-500 font-semibold">Connected to MongoDB</p>
        ) : (
          <p className="text-lg text-red-500 font-semibold">Not connected to MongoDB</p>
        )}
      </div>  */}

      <h4 className="text-lg text-gray-700 mb-6">Please enter a minimum of 10 pictures of each room below:</h4>

      {/* Upload Forms for Each Room */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        {rooms.map((room) => (
          <section
            key={room}
            className="p-6 bg-white border border-gray-300 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-lg font-medium text-gray-800 capitalize mb-3">{room}</h2>
            <UploadForm room={room} />
          </section>
        ))}
      </div>

      {/* Download Section */}
      <section className="mt-6 w-full max-w-md p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-base font-medium text-gray-700 mb-2">Download Files</h2>
        <DownloadForm />
      </section>

    </main>
  );
}
