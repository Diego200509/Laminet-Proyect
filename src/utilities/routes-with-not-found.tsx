import { Route, Routes } from "react-router-dom";

interface Props {
    children: JSX.Element[] | JSX.Element;
}

function RoutesWithNotFound ( {children} : Props ){
    return (
        <Routes>
            {children}
            <Route path="*" element={<div>No se encontro esta ruta</div>} />
        </Routes>
    );
}

export default RoutesWithNotFound;