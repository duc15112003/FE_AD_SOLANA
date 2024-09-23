import React, { useEffect, useState } from 'react'
import axios from 'axios'

const IdeaDone = () => {
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    // Call the API to get the data
    axios.get('http://localhost:8080/api/ideas/ideaDone?status=END')
      .then(response => {
        if (response.data.result) {
          setIdeas(response.data.result)
        }
      })
      .catch(error => {
        console.error('There was an error fetching the ideas!', error)
      })
  }, [])

  return (
    <div className="card mb-4">
      <div className="card-header">
        Danh sách ý tưởng đã làm
      </div>
      <div className="card-body">
        <div className="row">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo Title"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
              Search
            </button>
          </div>
          <table className="table" style={{ borderCollapse: 'unset' }}>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Created at</th>
                <th scope="col">End at</th>
                <th scope="col">Number of feedback</th>
                <th scope="col">Award for a feedback</th>
                <th scope="col">Owner</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr key={idea.id}>
                  <th scope="row">{idea.id}</th>
                  <td>{idea.title}</td>
                  <td>{idea.description}</td>
                  <td>{idea.createAt ? idea.createAt : 'N/A'}</td>
                  <td>{idea.endAt ? idea.endAt : 'N/A'}</td>
                  <td>{idea.countFeedback}</td>
                  <td>{idea.awardForOneFeedback}</td>
                  <td>{idea.accountUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default IdeaDone
