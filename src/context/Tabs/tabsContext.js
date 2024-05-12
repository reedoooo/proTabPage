import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [savedTabsData, setSavedTabsData] = useState([]);
  const [savedSettingsData, setSavedSettingsData] = useState([]);
  const [gridOrder, setGridOrder] = useState([]);
  const [selectedGridItem, setSelectedGridItem] = useState(null);

  const fetchSavedTabsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/tab`,
      );
      const savedTabs = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.tab.name,
          size: item.tab.size,
          color: item.tab.color,
          linkUrl: item.tab.linkUrl,
          imgUrl: item.tab.imgUrl,
          id: item._id,
        }));
      setSavedTabsData(savedTabs);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedSettings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/settings`,
      );
      const savedSettings = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.name,
          color: item.color,
          id: item._id,
        }));
      setSavedSettingsData(savedSettings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTabToServer = async (newLink) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/tab`,
        newLink,
      );
      console.log('Response: ', response);
      fetchSavedTabsData();
    } catch (error) {
      console.error(error);
    }
  };

  const saveSettingsChangesToServer = async (newSetting) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/settings`,
        newSetting,
      );
      console.log('Response: ', response);
      fetchSavedSettings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectGridItem = (type) => {
    setSelectedGridItem(type);
  };

  const handleClose = () => {
    setSelectedGridItem(null);
    handleSelectGridItem(null);
  };

  useEffect(() => {
    fetchSavedTabsData();
    fetchSavedSettings();
  }, []);

  useEffect(() => {
    setGridOrder([
      // Here, you can also put default items if you wish.
      ...savedTabsData.map((tab, index) => ({
        type: 'tab',
        backgroundImage: `url(${tab?.imgUrl})`,
        label: tab.name,
        tab,
      })),
    ]);
  }, [savedTabsData]);

  const value = {
    savedTabsData,
    savedSettingsData,
    handleAddTabToServer,
    saveSettingsChangesToServer,
    gridOrder,
    setGridOrder,
    selectedGridItem,
    setSelectedGridItem,
    handleSelectGridItem,
    handleClose,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
