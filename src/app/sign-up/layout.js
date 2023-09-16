import RequireAuth from "@/components/requireAuth";

// export const metadata = {
//   title: "Login page",
//   description: "Login page",
// };

const Layout = ({ children }) => {
  return <RequireAuth>{children}</RequireAuth>;
};
export default Layout;
