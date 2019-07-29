class Calendar {
  constructor() {
    this.rooms = {}
  }

  getRooms() {
    fetch('/rooms')
    .then(function(res) {
      return res.json()
    })
    .then(function(rooms) {
      this.rooms = rooms
    })
  }

  async getMeetingsForToday() {
    const response = await fetch('/meetings/today')
    const meetings = await response.json()
    return meetings
  }

  markOccupiedRooms() {
    getRooms()
    const meetings = getMeetingsForToday()
    
    for (var i = this.rooms.length; i >= 0; i--) {
      this.rooms[i].occupied =
        !!meetings.find(m => m.roomId == this.rooms[i].id)
    }
  }
}

const calendar = Calendar()
calendar.markOccupiedRooms()