export default {
  name: 'storagepool',
  title: 'Primary Storage',
  icon: 'database',
  permission: [ 'listStoragePoolsMetrics', 'listStoragePools' ],
  columns: [ 'name', 'state', 'ipaddress', 'type', 'path', 'scope', 'disksizeusedgb', 'disksizetotalgb', 'disksizeallocatedgb', 'disksizeunallocatedgb', 'clustername', 'zonename' ],
  details: [ 'name', 'id', 'ipaddress', 'type', 'scope', 'path', 'provider', 'hypervisor', 'overprovisionfactor', 'disksizetotal', 'disksizeallocated', 'disksizeused', 'clustername', 'podname', 'zonename', 'created' ],
  actions: [
    {
      api: 'createStoragePool',
      icon: 'plus',
      label: 'label.add.primary.storage',
      listView: true,
      args: ['scope', 'zoneid', 'podid', 'clusterid', 'name', 'provider', 'managed', 'capacityBytes', 'capacityIops', 'url', 'tags']
    },
    {
      api: 'updateStoragePool',
      icon: 'edit',
      label: 'label.edit',
      dataView: true,
      args: ['id', 'tags', 'capacitybytes', 'capacityiops']
    },
    {
      api: 'enableStorageMaintenance',
      icon: 'plus-square',
      label: 'label.action.enable.maintenance.mode',
      dataView: true,
      args: ['id'],
      show: (record) => { return ['Up', 'Connecting', 'Down', 'ErrorInMaintenance'].includes(record.state) }
    },
    {
      api: 'cancelStorageMaintenance',
      icon: 'minus-square',
      label: 'label.action.cancel.maintenance.mode',
      dataView: true,
      args: ['id'],
      show: (record) => { return ['Maintenance', 'PrepareForMaintenance', 'ErrorInMaintenance'].includes(record.state) }
    },
    {
      api: 'deleteStoragePool',
      icon: 'delete',
      label: 'label.action.delete.primary.storage',
      dataView: true,
      args: ['id', 'forced'],
      show: (record) => { return !(record.state === 'Down' || record.state === 'Alert' || record.state === 'Maintenance' || record.state === 'Disconnected') }
    }
  ]
}
