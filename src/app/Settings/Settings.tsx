import { useState } from "react";
import { User, Bell, Key, Palette, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Switch } from "../../components/ui/switch";
import { useTheme } from "../../lib/theme-provider";
import { toast } from "sonner";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [profileData, setProfileData] = useState({
    name: "Erik Brown",
    email: "erik.brown@company.com",
    phone: "+1 (555) 123-4567",
    position: "Sales Manager",
    company: "Tech Solutions Inc",
  });

  const [apiKey, setApiKey] = useState("sk_live_***************************");
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leadAssignments: true,
    dealUpdates: true,
    taskReminders: true,
    weeklyReport: false,
  });

  const handleProfileSave = () => {
    toast.success("Profile updated successfully");
  };

  const handleApiKeySave = () => {
    toast.success("API key updated successfully");
  };

  const handleNotificationsSave = () => {
    toast.success("Notification settings updated successfully");
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="theme" className="gap-2">
            <Palette className="w-4 h-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    EB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => handleProfileChange("position", e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => handleProfileChange("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProfileSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>
                Customize the appearance of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-border rounded-lg flex items-center justify-center">
                      ☀️
                    </div>
                    <div>
                      <p className="font-medium">Light Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Clean and bright interface
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                  >
                    {theme === "light" ? "Active" : "Select"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 border border-border rounded-lg flex items-center justify-center">
                      🌙
                    </div>
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Easy on the eyes in low light
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                  >
                    {theme === "dark" ? "Active" : "Select"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-900 border border-border rounded-lg flex items-center justify-center">
                      💻
                    </div>
                    <div>
                      <p className="font-medium">System</p>
                      <p className="text-sm text-muted-foreground">
                        Adapt to your system settings
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                  >
                    {theme === "system" ? "Active" : "Select"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Manage your Odoo API credentials and connection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiUrl">Odoo Instance URL</Label>
                  <Input
                    id="apiUrl"
                    placeholder="https://your-instance.odoo.com"
                    defaultValue="https://demo.odoo.com"
                  />
                  <p className="text-sm text-muted-foreground">
                    The base URL of your Odoo instance
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Your Odoo API authentication key
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    placeholder="your-database"
                    defaultValue="demo"
                  />
                  <p className="text-sm text-muted-foreground">
                    The name of your Odoo database
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="admin"
                    defaultValue="admin"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium">Connection Status: Connected</span>
                </div>
                <Button variant="outline" size="sm">
                  Test Connection
                </Button>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleApiKeySave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailNotifications", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("pushNotifications", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="leadAssignments">Lead Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new leads are assigned to you
                    </p>
                  </div>
                  <Switch
                    id="leadAssignments"
                    checked={notifications.leadAssignments}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("leadAssignments", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dealUpdates">Deal Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about changes in your deals
                    </p>
                  </div>
                  <Switch
                    id="dealUpdates"
                    checked={notifications.dealUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("dealUpdates", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="taskReminders">Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for upcoming tasks
                    </p>
                  </div>
                  <Switch
                    id="taskReminders"
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("taskReminders", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyReport">Weekly Performance Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary of your activities
                    </p>
                  </div>
                  <Switch
                    id="weeklyReport"
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("weeklyReport", checked)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNotificationsSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
