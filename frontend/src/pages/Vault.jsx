import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import PasswordCard from "../components/PasswordCard";
import PasswordForm from "../components/PasswordForm";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";

import toast from "react-hot-toast";

function Vault() {

  const [passwords, setPasswords] = useState([]);

  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [showPassword, setShowPassword] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    fetchPasswords();
  }, []);

  async function fetchPasswords() {

    try {

      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:8000/password/user/${userId}`
      );

      if (!response.ok)
        throw new Error("Unable to fetch passwords");

      const data = await response.json();

      setPasswords(data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load passwords.");

    } finally {

      setLoading(false);

    }

  }

  async function addPassword() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/password/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            website,
            username,
            password,
            category,
            notes,
            user_id: userId,
          }),
        }
      );

      if (!response.ok)
        throw new Error();

      toast.success("Password saved successfully");

      setWebsite("");
      setUsername("");
      setPassword("");
      setCategory("");
      setNotes("");

      fetchPasswords();

    } catch {

      toast.error("Unable to save password.");

    }

  }

  async function confirmDelete() {

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/password/delete/${deleteId}`,

        {
          method: "DELETE",
        }

      );

      if (!response.ok)
        throw new Error();

      toast.success("Password deleted");

      setDeleteId(null);

      fetchPasswords();

    } catch {

      toast.error("Unable to delete password.");

    }

  }

  function copyPassword(text) {

    navigator.clipboard.writeText(text);

    toast.success("Copied to clipboard");

  }

  const filteredPasswords = passwords.filter((item) => {

    const matchesSearch = item.website
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "" ||
      item.category === filterCategory;

    return matchesSearch && matchesCategory;

  });

  if (loading) {

    return (

      <MainLayout>

        <Loader />

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Password Vault

          </h1>

          <p className="text-slate-500 mt-2">

            Securely store and organize all your credentials.

          </p>

        </div>

        {/* Password Form */}

        <PasswordForm
          website={website}
          setWebsite={setWebsite}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          category={category}
          setCategory={setCategory}
          notes={notes}
          setNotes={setNotes}
          addPassword={addPassword}
        />

        {/* Search */}

        <SearchBar
          search={search}
          setSearch={setSearch}
          category={filterCategory}
          setCategory={setFilterCategory}
        />

        {/* Password List */}

        {

          filteredPasswords.length === 0 ?

          (

            <EmptyState />

          )

          :

          (

            <div className="grid lg:grid-cols-2 gap-6">

              {

                filteredPasswords.map((item) => (

                  <PasswordCard

                    key={item.id}

                    item={item}

                    showPassword={showPassword[item.id]}

                    togglePassword={() =>

                      setShowPassword({

                        ...showPassword,

                        [item.id]:
                          !showPassword[item.id],

                      })

                    }

                    copyPassword={copyPassword}

                    deletePassword={(id) =>
                      setDeleteId(id)
                    }

                  />

                ))

              }

            </div>

          )

        }

      </div>

      <DeleteModal

        open={deleteId !== null}

        onClose={() => setDeleteId(null)}

        onDelete={confirmDelete}

      />

    </MainLayout>

  );

}

export default Vault;