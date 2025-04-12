import Header from "../components/Header";
import Footer from "../components/Footer";

const LicensePage = () => {
  return (
    <>
      <Header></Header>
      <main className="flex-1 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-800 min-h-[80.4vh]">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-700 dark:shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">License</h2>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Copyright &copy; 2025 ParkSmart.
          </p>

          <h3 className="mt-8 text-2xl font-semibold text-gray-800 dark:text-white">
            All Rights Reserved
          </h3>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            By using this software, you agree to the following terms:
          </p>

          <ul className="mt-4 list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>You may use the software for personal use only.</li>
            <li>
              You may not copy, modify, distribute, or reverse engineer the
              software.
            </li>
            <li>Redistribution of the software is prohibited.</li>
          </ul>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            This software is provided "as-is" without warranty of any kind,
            either express or implied, including but not limited to the
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement. In no event shall the authors or copyright holders
            be liable for any claim, damages, or other liability, whether in an
            action of contract, tort, or otherwise, arising from, out of, or in
            connection with the software or the use or other dealings in the
            software.
          </p>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default LicensePage;
