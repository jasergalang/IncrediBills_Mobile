import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import FloatingButton from './FloatingButton';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';

export default function IncrediBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <>
      {!isOpen && !isMaximized && (
        <FloatingButton onOpen={() => setIsOpen(true)} />
      )}

      {/* Regular Chat Modal */}
      <Modal
        visible={isOpen && !isMaximized}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl h-[80%] shadow-2xl overflow-hidden">
            <ChatHeader
              title="IncrediBot"
              onClose={() => setIsOpen(false)}
              onMaximize={() => {
                setIsOpen(false);
                setIsMaximized(true);
              }}
              isMaximized={false}
            />
            <ChatContent />
          </View>
        </View>
      </Modal>

      {/* Maximized Modal */}
      <Modal
        visible={isMaximized}
        animationType="fade"
        transparent={false}
      >
        <View className="flex-1 bg-white">
          <ChatHeader
            title="IncrediBot"
            onClose={() => setIsMaximized(false)}
            onMaximize={() => {
              setIsMaximized(false);
              setIsOpen(true);
            }}
            isMaximized={true}
          />
          <ChatContent isMaximized />
        </View>
      </Modal>
    </>
  );
}