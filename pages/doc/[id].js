import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useSession, getSession, signout } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";
import { db } from "../../firebase";

function Doc() {
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loading] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
  );

  if (!session) return <Login />;
  if (!loading && !snapshot?.data()?.documentName) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex items-center justify-between p-3">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className="flex-grow px-2">
          <h2>{snapshot?.data()?.documentName}</h2>
          <div className="flex items-center space-x-1 text-sm text-gray-700 -ml-1 h-8">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button color="lightBlue"   ripple="light" className="hidden md:inline-flex h-10">
            <Icon name="people" size="md"    /> Share
        </Button>
        <img onclick={signout} className="rounded-full h-10 w-10 ml-2 " src={session.user.image} alt="" />
      </header>
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function  getServerSideProps(context){
    const session = await getSession(context);
    return{
        props:{
            session
        }
    }
}
