export default {
  key: 'Household Characteristics and Household Population',
  value: 'Household Characteristics and Household Population/housing',
  comparison: true,
  column: 'Participants',
  titles: ['Household', 'Population'],
  values: [
    {
      key: 'Housing',
      value: 'Household Characteristics and Household Population/housing',
      comparison: true,
      column: 'Participants',
      titles: ['Household', 'Population']
    },
    {
      key: 'Health Insurance coverage',
      value:
        'Household Characteristics and Household Population/Health Insurance coverage',
      comparison: false
    },
    {
      key: 'Cooking',
      value: 'Household Characteristics and Household Population/cooking',
      comparison: true,
      column: 'Participants',
      titles: ['Household', 'Population']
    },
    {
      key: 'Birth Registration',
      value:
        'Household Characteristics and Household Population/Birth Registration',
      comparison: false
    },
    {
      key: 'School Attendance',
      values: [
        {
          key: 'County',
          value:
            'Household Characteristics and Household Population/School attendance/table_2_12C_School_attendance_by_county',
          comparison: true,
          column: 'Ratio',
          map: true,
          titles: ['Net Attendance Ratio', 'Gross Attendance Ratio']
        },
        {
          key: 'Characteristics',
          value:
            'Household Characteristics and Household Population/School attendance/table_2_12_School_attendance_by_background_xtics',
          comparison: true,
          column: 'Gender',
          titles: ['Female', 'Male']
        }
      ]
    },
    {
      key: 'Road Traffic Accidents',
      values: [
        {
          key: 'County',
          value:
            'Household Characteristics and Household Population/Road Traffic Accidents/table_2_17_RTA_by_county',
          map: true,
          comparison: false
        },
        {
          key: 'Characteristics',
          value:
            'Household Characteristics and Household Population/Road Traffic Accidents/table_2_17_RTA_by_background_xtics',
          comparison: false
        }
      ]
    },
    {
      key: 'Provider of cash transfer or social assistance',
      values: [
        {
          key: 'County',
          value:
            'Household Characteristics and Household Population/Provider of cash transfer or social assistance/table_2_22_2C_cash_transfer_by_county',
          map: true,
          comparison: false
        },
        {
          key: 'Characteristics',
          value:
            'Household Characteristics and Household Population/Provider of cash transfer or social assistance/table_2_22_1_cash_transfer_by_provider',
          comparison: false,
          titles: ['percentage (%)']
        }
      ]
    },
    {
      key: 'Covid-19 diagnosis and vaccination',
      values: [
        {
          key: 'County',
          map: true,
          value:
            'Household Characteristics and Household Population/Covid-19 diagnosis and vaccination/table_2_19_1C_covid_by_county',
          comparison: false
        },
        {
          key: 'Characteristics',
          value:
            'Household Characteristics and Household Population/Covid-19 diagnosis and vaccination/table_2_19_1_covid_by_background_xtics',
          comparison: false
        }
      ]
    }
  ]
}
