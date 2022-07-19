// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
// with the License. A copy of the License is located at
//
// http://aws.amazon.com/apache2.0/
//
// or in the "LICENSE.txt" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
// OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import { LoadInitialState} from '../model'

import { useState } from '../store'

import Layout from "../old-pages/Layout"
import Clusters from "../old-pages/Clusters/Clusters"
import JobsDefinitions from "../old-pages/JobsDefinitions/JobsDefinitions"
import Configure from "../old-pages/Configure/Configure"
import CustomImages from "../old-pages/CustomImages/CustomImages"
import OfficialImages from "../old-pages/OfficialImages/OfficialImages"
import Users from "../old-pages/Users/Users"
import Home from "../old-pages/Home/Home"

// UI Elements
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Loading from '../components/Loading'

import { isGuest, setState } from '../store';
import Job from '../old-pages/JobsDefinitions/Job';
import JobDefinitionEditor from '../old-pages/JobsDefinitions/JobDefinitionEditor';

// TODO this part will be removed
import { jobsDefinitionsMock } from '../old-pages/JobsDefinitions/jobDefinition';

export default function App() {
  const identity = useState(['identity']);

  // TODO this part will be removed
  setState(['jobs-definitions', 'list'], jobsDefinitionsMock)

  React.useEffect(() => {
    LoadInitialState();
  }, [])

  return <>
    <CssBaseline />
    {identity ?
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="index.html" element={isGuest() ? <Home /> : <Navigate replace to='/clusters' />} />
            <Route index element={isGuest() ? <Home /> : <Navigate replace to='/clusters' />} />
            <Route path="home" element={<Home />} />
            <Route path="clusters" element={<Clusters />}>
              <Route path=":clusterName" element={<div></div>}>
                <Route path=":tab" element={<div></div>}/>
              </Route>
            </Route>
            <Route path="jobs-definitions" element={<JobsDefinitions />}>
              
            </Route>
            <Route path="jobs-definitions/:jobDefinitionId" element={<JobDefinitionEditor />} />
            <Route path="jobs/:jobId" element={<Job />} />
            <Route path="configure" element={<Configure />} />
            <Route path="custom-images" element={<CustomImages />} />
            <Route path="official-images" element={<OfficialImages />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
      : <Loading />
    }
  </>;
}
