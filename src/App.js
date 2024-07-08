import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import SearchButton from "./components/Search";
import Articles from "./components/Articles";
import React, { useState } from "react";
import CustomizeFeed from "./components/CustomizeFeed";
import PreferredFeed from "./components/PrefferedFeed";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout, Menu, theme } from "antd";

const { Header, Content } = Layout;

function App() {
  const [articles, setArticles] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "search",
      label: <Link to="/search">Search</Link>,
    },
    {
      key: "customizeFeed",
      label: <Link to="/customize-feed">Customize Feed</Link>,
    },
    {
      key: "preferredFeed",
      label: <Link to="/preferred-feed">Preferred Feed</Link>,
    },
    {
      key: "login",
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "register",
      label: <Link to="/register">Register</Link>,
    },
  ];

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Content style={{ padding: "20px 48px" }}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/search"
                    element={
                      <>
                        <SearchButton setArticles={setArticles} />
                        {articles && <Articles articles={articles} />}
                      </>
                    }
                  />
                  <Route
                    path="/customize-feed"
                    element={
                      <>
                        <CustomizeFeed />
                      </>
                    }
                  />
                  <Route
                    path="/preferred-feed"
                    element={
                      <>
                        <PreferredFeed />
                      </>
                    }
                  />
                </Route>
              </Routes>
            </div>
          </Content>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
