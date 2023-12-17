import discord
import sys
from discord import app_commands
from discord.ext import commands

bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())

arguments = sys.argv
TOKEN = arguments[1]

@bot.event
async def on_ready():
    print('Loarby is ready.')
    


@bot.tree.command(name='sync', description='Owner only')
async def sync(interaction: discord.Interaction):
    if interaction.user.id == 200459701752692738:
        await interaction.response.send_message('Synching commands...', ephemeral=True)
        await bot.tree.sync(guild=interaction.guild)
        print("synched commands")
    else:
        await interaction.response.send_message('You must be the owner to use this command!',  delete_after=5)


@bot.tree.command( name="ping", description="responds with pong") # !ping
async def ping( interaction: discord.Interaction ):
    await interaction.response.send_message('Pong!')


@bot.tree.command( name="hey", description="responds with hey") 
async def hey( interaction: discord.Interaction ):
    await interaction.response.send_message('Hey!')


@bot.tree.command(name='shutdown', description='Owner only')
async def shutdown(interaction: discord.Interaction):
    if interaction.user.id == 200459701752692738:
        await interaction.response.send_message('Shutting down...',  ephemeral=True)
        print('Shutting down...')
        sys.exit()
    else:
        await interaction.response.send_message('You must be the owner to use this command!')


bot.run(TOKEN)