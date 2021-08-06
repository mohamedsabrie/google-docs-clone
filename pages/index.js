import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useSession, getSession } from "next-auth/client";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollection} from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
  const [session] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const createDocument = () => {
    if (!input || input.trim() === "") return;
    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      documentName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setShowModal(false);
    setInput("");
  };
  const [snapshot] = useCollection(
    db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );
  

  if (!session) return <Login />;

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          className="w-full outline-none "
          placeholder="Enter name of doc"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          ripple="dark"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button color="blue" ripple="light" onClick={createDocument}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-gray-100 px-10 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg "> Start a new document</h2>
            <Button
              color="gray"
              ripple="dark"
              buttonType="outline"
              iconOnly={true}
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" color="gray" />
            </Button>
          </div>
          <div>
            <div
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-700"
              onClick={() => setShowModal(true)}
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-gray-700 text-sm">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-gray-700 text-sm">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-medium">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
        {snapshot?.docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            documentName={doc.data().documentName}
            date={doc.data().timestamp}
          />
        ))}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
