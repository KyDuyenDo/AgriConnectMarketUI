import { ActionButtonList } from "@/components/customer-dashboard/ActionButtonList"
import { Header } from "@/components/customer-dashboard/Header"
import { RecentOrdersCard } from "@/components/customer-dashboard/RecentOrdersCard"
import { SpecialOffersCard } from "@/components/customer-dashboard/SpecialOffersCard"
import { YourCartCard } from "@/components/customer-dashboard/YourCartCard"
import { YourFavoriteCard } from "@/components/customer-dashboard/YourFavoriteCard"
import type React from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export const CustomerDashboardScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 24 }}
      >
        <Header
          userName="Yung Chen"
          profileImage="https://th.bing.com/th/id/R.c791922bcc10b38abfee71c89c3fff82?rik=qNyYcWrvzrww7A&pid=ImgRaw&r=0"
          notificationCount={3}
        />
        <ActionButtonList />
        <YourCartCard />
        <RecentOrdersCard />
        <YourFavoriteCard />
        <SpecialOffersCard />
      </ScrollView>
    </SafeAreaView>
  )
}
