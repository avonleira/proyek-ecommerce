import { useState } from 'react'
import { DataGrid, GridActionsCellItem, GridColumns, GridDensity, GridInputSelectionModel, GridSelectionModel, GridToolbar } from '@mui/x-data-grid'

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const defaultRowsPerPageOptions = [5, 10, 20, 50, 100];
const defaultPageSize = 5;
const defaultColumns = [
  { field: "name", type: "string", headerName: "Name", width: 300 },
  { field: "email", type: "string", headerName: "Email", width: 200 },
  { field: "phone", type: "string", headerName: "Phone", width: 200 },
  {
    field: 'actions', headerName: "Action", type: 'actions', width: 120,
    getActions: (params: any) => [
      <GridActionsCellItem
        color="error" label="Delete"
        icon={<DeleteIcon />}
        // onClick={handleDelete(params.row)}
        showInMenu
      />,
      <GridActionsCellItem
        color="info" label="Detail"
        icon={<InfoIcon />}
        // onClick={handleInfo(params.row)}
      />,
    ],
  },
]

interface IProps {
  rows?: readonly {[key: string]: any;}[]
  columns?: GridColumns
  pageSize?: number
  rowsPerPageOptions?: number[]
  CustomGridToolbar?: React.JSXElementConstructor<any> | null
  density?: GridDensity
  autoHeight?: boolean
  disableSelectionOnClick?: boolean
  checkboxSelection?: boolean
  selectionModel?: GridInputSelectionModel
  setSelectionModel?: (value: GridSelectionModel) => void
}

export default function MyDataGrid(props: IProps) {
  const { rows = [], columns } = props;
  const { pageSize, rowsPerPageOptions, CustomGridToolbar, density } = props;
  const { autoHeight = true, disableSelectionOnClick = true } = props;
  const { checkboxSelection = false, selectionModel = [], setSelectionModel = () => {}} = props;

  const [gridPageSize, setgridPageSize] = useState(pageSize??defaultPageSize)

  return (
    <DataGrid
      rows={rows}
      columns={columns??defaultColumns}
      pageSize={gridPageSize}
      onPageSizeChange={(newPageSize) => setgridPageSize(newPageSize)}
      rowsPerPageOptions={rowsPerPageOptions??defaultRowsPerPageOptions}
      autoHeight={autoHeight}
      density={density??"compact"}
      disableSelectionOnClick={disableSelectionOnClick}
      components={{
        Toolbar: CustomGridToolbar??GridToolbar,
      }}
      checkboxSelection={checkboxSelection}
      onSelectionModelChange={(newValue) => {
        console.log("New Selection Model Value", newValue);
        setSelectionModel(newValue)
      }}
      selectionModel={selectionModel}
    />
  )
}
