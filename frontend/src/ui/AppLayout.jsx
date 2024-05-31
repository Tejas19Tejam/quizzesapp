import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Modal from "./Modal";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-200);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  grid-row: 1/-1;
`;

const Container = styled.div`
  display: flex;
  max-width: 120rem;
  margin: 0 auto;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Modal>
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </Modal>
    </StyledAppLayout>
  );
}

export default AppLayout;
