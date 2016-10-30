import React, { Component } from 'react';
import { search, Search, SearchColumns } from 'reactabular';
import 'reactabular-table';
import VisibilityToggles from 'reactabular-visibility-toggles';
import cloneDeep from 'lodash/cloneDeep';
import EasyTable from 'reactabular-easy';
import './Table.css'

const tableRows = []

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRows,
      columns: this.getColumns(),
      sortingColumns: {},
      query: {}
    };
    this.onToggleColumn = this.onToggleColumn.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.onSort = this.onSort.bind(this);
  }

getColumns() {
  return [
    {
      property: 'datetime_published',
      header: {
        label: 'дата на публикација',
        sortable: true,
        resizable: true
      },
      width: 150,
      visible: true
    },
    {
      property: 'title',
      header: {
        label: 'наслов',
        sortable: true,
        resizable: true
      },
      cell: {
        highlight: true
      },
      width: 150,
      visible: true
    },
    {
      property: 'description',
      header: {
        label: 'дескрипција',
        sortable: true,
        resizable: true
      },
      cell: {
        highlight: true
      },
      width: 300,
      visible: true
    },
    {
      property: 'source',
      header: {
        label: 'извор',
        sortable: true,
        resizable: true
      },
      cell: {
        highlight: true
      },
      width: 150,
      visible: true
    },
    {
      property: 'link',
      header: {
        label: 'линк',
        sortable: true,
        resizable: true
      },
      cell: {
        highlight: true
      },
      width: 150,
      visible: true,
      maxWidth: 50
    },
    {
      property: 'categories',
      header: {
        label: 'категории',
        sortable: true,
        resizable: true
      },
      cell: {
        highlight: true
      },
      width: 200,
      visible: true
    },
    {
      property: 'verification',
      header: {
        label: 'верифицирано/неверифицирано',
        sortable: true,
        resizable: true
      },
      cell: {
        highlight: true
      },
      width: 150,
      visible: true
    }
  ]
}

  render() {
    const { columns, sortingColumns, tableRows, query } = this.state;
    const visibleColumns = this.state.columns.filter(column => column.visible);

    const data = this.props
    
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        tableRows.push(data[key]);
      }
    }

    const tableRowsReversed = tableRows.reverse()

    return (
      <div className="table-container" >
        <VisibilityToggles
          columns={columns}
          onToggleColumn={this.onToggleColumn}
        />
        <div className="search-container">
          <span>Search</span>
          <Search
            query={query}
            columns={visibleColumns}
            rows={tableRows}
            onChange={query => this.setState({ query })}
          />
        </div>
        <EasyTable
          rows={tableRowsReversed}
          rowKey="id"
          sortingColumns={sortingColumns}
          tableWidth={1200}
          tableHeight={600}
          columns={visibleColumns}
          query={query}
          classNames={{
            table: {
              wrapper: 'pure-table pure-table-striped'
            },
            thead: 'thead-headers'
          }}
          headerExtra={
            <SearchColumns
              query={query}
              columns={visibleColumns}
              onChange={query => this.setState({ query })}
            />
          }
          toggleChildrenProps={{ className: 'toggle-children' }}

          idField="id"
          parentField="parent"

          onMoveColumns={this.onMoveColumns}
          onSelectRow={this.onSelectRow}
          onSort={this.onSort}
          onRow={this.onRow}
          onToggleShowingChildren={this.onToggleShowingChildren}
        />
      </div>
    );
  }

  onMoveColumns(columns) {
    console.log('onMoveColumns', columns);
  }
  onSelectRow({ selectedRowId, selectedRow }) {
    console.log('onSelectRow', selectedRowId, selectedRow);
  }
  onSort(sortingColumns) {
    console.log('onSort', sortingColumns);

    this.setState({ sortingColumns });
  }
  onRow(row, { rowIndex }) {
    return {
      className: rowIndex % 2 ? 'odd-row' : 'even-row'
    };
  }
  onToggleColumn(columnIndex) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}

export default MainTable;
