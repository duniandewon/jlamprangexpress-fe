const dataTableData = {
  columns: [
    { Header: "resi", accessor: "resi", width: "15%" },
    { Header: "member", accessor: "member", width: "20%" },
    { Header: "penerima", accessor: "reciever", width: "20%" },
    { Header: "tanggal", accessor: "date", width: "15%" },
    { Header: "Eksoedisi", accessor: "expedition", width: "10%" },
    { Header: "Tagihan", accessor: "fee" },
  ],

  rows: [
    {
      resi: "11LP1654651010734",
      member: "M Bagus panuntun (BagusNesia)",
      reciever: "DIANA",
      date: "10/06/2022",
      expedition: "JNT:EZ",
      fee: "Rp 9.500",
    },
    {
      resi: "660046430019",
      member: "Aminah Mona Ba'bud",
      reciever: "DINI / BU BARNO ( AGEMAN BATIK )",
      date: "09/06/2022",
      expedition: "TIKI:REG",
      fee: "Rp 14.000",
    },
    {
      resi: "TBUMRL9H",
      member: "Aliyah",
      reciever: "YUDI / LENA",
      date: "09/06/2022",
      expedition: "WAHANA",
      fee: "Rp 7.840",
    },
    {
      resi: "DA61RTJP",
      member: "Aliyah",
      reciever: "SUSAN",
      date: "09/06/2022",
      expedition: "WAHANA",
      fee: "Rp 6.860",
    },
  ],
};

export default dataTableData;
