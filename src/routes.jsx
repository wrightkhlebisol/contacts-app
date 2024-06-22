import { createBrowserRouter } from "react-router-dom";
import { getContact, getContacts, createContact } from "./contacts";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import EditContact from "./routes/edit";


export async function rootAction() {
  const contact = await createContact();
  return { contact };
}

export async function rootLoader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return {contact};
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader,
      },
    ],
  },
]);

export default router;