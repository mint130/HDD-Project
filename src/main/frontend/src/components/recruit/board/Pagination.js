import styled from "styled-components";

function Pagination({total, limit, page, setPage}) {
    const numPages = Math.ceil(total/limit);

    return (
        <Nav>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </Button>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <Button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? "page" : undefined}
                    >
                        {i + 1}
                    </Button>
                ))}
            <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </Button>
        </Nav>
    );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 25px;
`;

const Button = styled.button`
  border: none;
  height: 30px;
  width:30px;
  text-align:center;
  line-height:30px;
  margin: 0;
  background: white;
  color: black;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    color: #9B9B9B;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background-color: #013B70;
    color: white;
    font-weight: 500;
    cursor: revert;
    transform: revert;
  }
`;
export default Pagination;