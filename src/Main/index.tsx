import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import TableModal from "../components/TableModa";

import { Text } from "../components/Text";
import { Container } from "./styles";

export default function Main() {
    const [openModal, setOpenModal] = useState(false)
    const [tableSelected, setTableSelected] = useState('')

    function handleSaveTable(table: string) {
        setTableSelected(table)
    }

    return (
        <>
            <Container>
                <Header />
                <Menu />
            </Container>
            
                {!tableSelected && (
                    <Footer setOpenModal={setOpenModal} />
                )}
            
            <TableModal openModal={openModal} setOpenModal={setOpenModal} onSave={handleSaveTable} />
        </>
    )
}