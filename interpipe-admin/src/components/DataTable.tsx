import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function DataTable({ columns, data, onEdit, onDelete }: DataTableProps) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="center">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                {(onEdit || onDelete) && (
                  <TableCell align="center">
                    {onEdit && (
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
} 